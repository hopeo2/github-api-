import { useCallback, useEffect, useState } from "react";
import ProfileInfo from "../components/ProfileInfo";
import Repos from "../components/Repos";
import Search from "../components/Search";
import SortRepos from "../components/SortRepos";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";
// import { useAuthContext } from "../context/AuthContext";

const HomePage = () => {

    const [userProfile, setUserProfile] = useState(null);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);

    const [sortType, setSortType] = useState("recent");

    const getUserProfileAndRepos = useCallback(
        async (username = "hopeo2") => {
            setLoading(true);
            try {
                const res = await fetch(
                    `https://api.github.com/users/${username}`,
                    {
                        headers: {
                            authorization: `token ${
                                process.env.VITE_VERCEL_GITHUB_API_KEY
                            }`,
                        },
                    }
                );
                const userProfile = await res.json();
                setUserProfile(userProfile);

                const repoRes = await fetch(userProfile.repos_url);
                const repos = await repoRes.json();
                setRepos(repos);

                repos.sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                ); //descending, recent first
                setRepos(repos);

                return { userProfile, repos };
            } catch (error) {
                toast.error(error.message);
                toast.error("internal server 500 username Not found!!");
            } finally {
                setLoading(false);
            }
        },
        []
    );

    useEffect(() => {
        getUserProfileAndRepos();
    }, [getUserProfileAndRepos]);

    const onSearch = async (e, username) => {
        e.preventDefault();

        setLoading(true);
        setRepos([]);
        setUserProfile(null);

        const { userProfile, repos } = await getUserProfileAndRepos(username);

        setUserProfile(userProfile);
        setRepos(repos);
        setLoading(false);
        setSortType("recent");
    };

    const onSort = (sortType) => {
        switch (sortType) {
            case "recent":
                repos.sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                );
                break;
            case "stars":
                repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
                break;
            case "forks":
                repos.sort((a, b) => b.forks_count - a.forks_count);
                break;
            default:
                return repos;
        }
        setSortType(sortType);
        setRepos([...repos]);
    };

    return (
        //items-start
        <div className="m-4">
            <Search onSearch={onSearch} />
            {repos.length > 0 && (
                <SortRepos onSort={onSort} sortType={sortType} />
            )}
            <div className="flex gap-4 flex-col lg:flex-row justify-center mx-auto">
                {userProfile && !loading && (
                    <ProfileInfo userProfile={userProfile} />
                )}
                {!loading && <Repos repos={repos} />}
                {loading && <Spinner />}
            </div>
        </div>
    );
};

export default HomePage;
