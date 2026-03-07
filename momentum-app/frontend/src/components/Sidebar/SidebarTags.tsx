import React, { useEffect, useState } from "react";
import { Sparkles, Eye, History, Activity, Zap } from "lucide-react";
import { apiRequest } from "@/utils/api";
import { useLayout } from "@/contexts/LayoutContext";
import { useNavigate } from "react-router-dom";

interface TagData {
    tag: string;
    tasks: any[];
}

const SidebarTags: React.FC = () => {
    const [tags, setTags] = useState<TagData[]>([]);
    const [loading, setLoading] = useState(true);
    const { setSearchQuery } = useLayout();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const data = await apiRequest("/tasks/tags");
                // Filter out any potential empty or null tags
                setTags(data.filter((t: TagData) => t.tag && t.tag.trim() !== ""));
            } catch (err) {
                console.error("Failed to fetch tags for sidebar:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTags();
    }, []);

    if (loading || tags.length === 0) return null;

    // Derive categories
    const sortedByUsage = [...tags].sort((a, b) => b.tasks.length - a.tasks.length);
    const mostUsed = sortedByUsage.slice(0, 4);

    const sortedByRecent = [...tags].sort((a, b) => {
        const recentA = Math.max(...a.tasks.map(t => new Date(t.createdAt).getTime()));
        const recentB = Math.max(...b.tasks.map(t => new Date(t.createdAt).getTime()));
        return recentB - recentA;
    });
    const recent = sortedByRecent.slice(0, 3);

    // Mock AI Suggested: pick tags that rotate or are less frequently used but relevant
    const aiSuggested = tags
        .filter(t => !mostUsed.find(m => m.tag === t.tag))
        .slice(0, 2);

    const handleTagClick = (tag: string) => {
        setSearchQuery(tag);
        navigate("/notes");
    };

    const maxTasks = Math.max(...tags.map(t => t.tasks.length));

    return (
        <div className="mt-8 px-1">
            {/* Heading */}
            <div className="flex items-center justify-between mb-5 px-3">
                <button
                    onClick={() => navigate("/tags")}
                    className="text-gray-500 hover:text-cyan-400 transition-colors text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 cursor-pointer"
                >
                    Tags
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                </button>
            </div>

            {/* Mini Tag Cloud */}
            <div className="flex flex-wrap gap-2 mb-8 px-3">
                {tags.slice(0, 12).map((tagData) => {
                    const isPopular = tagData.tasks.length >= (maxTasks * 0.7);

                    return (
                        <div key={tagData.tag} className="group relative">
                            <button
                                onClick={() => handleTagClick(tagData.tag)}
                                className={`
                  text-[10px] px-2.5 py-1.5 rounded-lg transition-all duration-300 cursor-pointer
                  flex items-center gap-2 border leading-none
                  ${isPopular
                                        ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-300 font-bold shadow-[0_0_15px_rgba(34,211,238,0.1)] scale-105"
                                        : "bg-gray-800/20 border-gray-800/50 text-gray-500 hover:text-white hover:border-gray-700 hover:bg-gray-800/40"
                                    }
                `}
                            >
                                <span className="tracking-wide">#{tagData.tag}</span>
                                <Eye className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-200 text-cyan-400 translate-x-1 group-hover:translate-x-0" />
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Smart Filters Header */}
            <div className="px-3 mb-4">
                <div className="h-px bg-linear-to-r from-gray-800/50 via-gray-800 to-gray-800/50 mb-6" />
                <h4 className="text-gray-600 text-[9px] font-bold uppercase tracking-[0.2em] mb-4">Smart Filters</h4>

                <div className="space-y-4">
                    {/* Most Used */}
                    <div className="group/sec">
                        <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium mb-3 group-hover/sec:text-cyan-400/70 transition-colors">
                            <Activity className="w-3 h-3" />
                            <span>Most Used</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 ml-5">
                            {mostUsed.map(t => (
                                <button
                                    key={t.tag}
                                    onClick={() => handleTagClick(t.tag)}
                                    className="text-[10px] text-gray-500 hover:text-cyan-400 cursor-pointer transition-colors"
                                >
                                    #{t.tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* AI Suggested */}
                    <div className="group/ai">
                        <div className="flex items-center gap-2 text-[10px] text-cyan-400/60 font-medium mb-3 group-hover/ai:text-cyan-400 transition-colors">
                            <Zap className="w-3 h-3" />
                            <span>AI Suggested</span>
                            <Sparkles className="w-2.5 h-2.5" />
                        </div>
                        <div className="flex flex-wrap gap-1.5 ml-5">
                            {aiSuggested.map(t => (
                                <button
                                    key={t.tag}
                                    onClick={() => handleTagClick(t.tag)}
                                    className="text-[10px] text-gray-500 hover:text-cyan-400 cursor-pointer transition-colors"
                                >
                                    #{t.tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Recent */}
                    <div className="group/rec">
                        <div className="flex items-center gap-2 text-[10px] text-gray-500/70 font-medium mb-3 group-hover/rec:text-gray-400 transition-colors">
                            <History className="w-3 h-3" />
                            <span>Recent Activity</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 ml-5">
                            {recent.map(t => (
                                <button
                                    key={t.tag}
                                    onClick={() => handleTagClick(t.tag)}
                                    className="text-[10px] text-gray-600 hover:text-gray-400 cursor-pointer transition-colors"
                                >
                                    #{t.tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SidebarTags;
