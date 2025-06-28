
import RoomCard from "@/features/home/components/room-card";
import {useAuth} from "@/features/auth/hooks/use-auth";
import {redirect} from "next/navigation";
import {toast} from "sonner";

const Page = () => {

    const { isAuthenticated } = useAuth();

    if( !isAuthenticated ){
        toast.error("User not logged in");
        redirect("/sign-in")
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
            <div className="w-full max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent mb-4">
                        Welcome
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
                        Create or join a room to start collaborating with others in real-time
                    </p>
                </div>

                <div className="flex justify-center">
                    <RoomCard />
                </div>

                <div className="mt-16 flex flex-wrap justify-center gap-4">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3">
                        <span className="text-gray-300 text-sm font-medium">🚀 Instant Setup</span>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3">
                        <span className="text-gray-300 text-sm font-medium">🔒 Secure Rooms</span>
                    </div>
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-6 py-3">
                        <span className="text-gray-300 text-sm font-medium">⚡ Real-time Sync</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
