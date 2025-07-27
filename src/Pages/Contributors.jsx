import { useEffect, useState } from "react";
import { Github, ChevronDown } from "lucide-react";

const ContributorsPage = () => {
    const [contributors, setContributors] = useState([]);
    const [displayedContributors, setDisplayedContributors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const CONTRIBUTORS_PER_PAGE = 9;

    useEffect(() => {
        const fetchContributors = async () => {
            try {
                const response = await fetch(
                    "https://api.github.com/repos/HarshS16/Civix/contributors"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch contributors");
                }

                const data = await response.json();
                const sortedData = (data || []).sort(
                    (a, b) => b.contributions - a.contributions
                );

                setContributors(sortedData);
                setDisplayedContributors(
                    sortedData.slice(0, CONTRIBUTORS_PER_PAGE)
                );
                setHasMore(sortedData.length > CONTRIBUTORS_PER_PAGE);
            } catch (err) {
                console.error(err);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchContributors();
    }, []);

    const loadMoreContributors = () => {
        setIsLoadingMore(true);

        const nextPage = page + 1;
        const startIndex = page * CONTRIBUTORS_PER_PAGE;
        const endIndex = startIndex + CONTRIBUTORS_PER_PAGE;

        const newContributors = contributors.slice(startIndex, endIndex);

        setTimeout(() => {
            setDisplayedContributors((prev) => [
                ...prev,
                ...newContributors,
            ]);
            setPage(nextPage);
            setHasMore(endIndex < contributors.length);
            setIsLoadingMore(false);
        }, 500);
    };

    return (
        <section className="min-h-screen p-6 sm:p-10 bg-gradient-to-b from-slate-100 via-white to-slate-200 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] transition-colors">
            <h2 className="text-4xl font-extrabold text-center text-teal-600 dark:text-teal-400 mb-12">
                💖 Meet Our Contributors
            </h2>

            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 animate-pulse flex flex-col items-center"
                        >
                            <div className="w-20 h-20 bg-gray-300 dark:bg-slate-600 rounded-full mb-4" />
                            <div className="w-32 h-4 bg-gray-300 dark:bg-slate-600 rounded mb-2" />
                            <div className="w-20 h-3 bg-gray-300 dark:bg-slate-600 rounded" />
                        </div>
                    ))}
                </div>
            ) : isError ? (
                <p className="text-center text-red-600 dark:text-red-400 text-lg font-medium">
                    🚨 Couldn't load contributors. Please try again later.
                </p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {displayedContributors.map((user) => (
                            <div
                                key={user.login}
                                className="bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center py-8 px-6 group"
                            >
                                <img
                                    src={user.avatar_url}
                                    alt={user.login}
                                    className="w-20 h-20 rounded-full border-2 border-teal-400 dark:border-teal-500 mb-4 shadow-sm"
                                />
                                <h3 className="text-xl font-semibold text-slate-800 dark:text-white">
                                    @{user.login}
                                </h3>
                                <p className="mt-2 text-sm bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 px-4 py-1 rounded-full font-medium">
                                    {user.contributions}{" "}
                                    {user.contributions > 1
                                        ? "contributions"
                                        : "contribution"}
                                </p>
                                <a
                                    href={user.html_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-slate-700 text-white py-2 rounded-lg font-medium hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors"
                                >
                                    <Github className="w-5 h-5" />
                                    View Profile
                                </a>
                            </div>
                        ))}
                    </div>

                    {hasMore && (
                        <div className="flex justify-center mt-12">
                            <button
                                onClick={loadMoreContributors}
                                disabled={isLoadingMore}
                                className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600 text-white px-8 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoadingMore ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Loading more...
                                    </>
                                ) : (
                                    <>
                                        <ChevronDown className="w-5 h-5" />
                                        Show More Contributors
                                    </>
                                )}
                            </button>
                        </div>
                    )}

                    {isLoadingMore && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
                            {Array.from({ length: 3 }).map((_, index) => (
                                <div
                                    key={`loading-${index}`}
                                    className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 animate-pulse flex flex-col items-center"
                                >
                                    <div className="w-20 h-20 bg-gray-300 dark:bg-slate-600 rounded-full mb-4" />
                                    <div className="w-32 h-4 bg-gray-300 dark:bg-slate-600 rounded mb-2" />
                                    <div className="w-20 h-3 bg-gray-300 dark:bg-slate-600 rounded" />
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </section>
    );
};

export default ContributorsPage;
