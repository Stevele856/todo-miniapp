import AddTask from "@/components/AddTask"
import DateTimeFilter from "@/components/DateTimeFilter"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import StatsAndFilter from "@/components/StatsAndFilter"
import TaskList from "@/components/TaskList"
import TaskListsPagination from "@/components/TaskListsPagination"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import api from "@/lib/axios"
import { visibleTasksDisplay } from "@/lib/data"
import PetStickers from "@/components/PetSticker"


const Homepage = () => {
    const [taskBuffer, setTaskBuffer] = useState([]);
    const [activeTaskCount, setActiveTaskCount] = useState(0);
    const [pendingTaskCount, setPendingTaskCount] = useState(0);
    const [completedTaskCount, setCompletedTaskCount] = useState(0); 
    const [totalTasks, setTotalTasks] = useState(0); 
    const [filter, setFilter] = useState('all');
    const [dateQuery, setDateQuery] = useState('today');
    const [page, setPage] = useState(1);


    const fetchData = async () => {

        try {
            const res = await api.get(`/tasks/?filter=${dateQuery}`)
            setTaskBuffer(res.data.tasks)
            setActiveTaskCount(res.data.activeCount)
            setPendingTaskCount(res.data.pendingCount)
            setCompletedTaskCount(res.data.completedCount)
            setTotalTasks(res.data.tasks.length)

        } catch (error) {
            console.error('Không thể lấy dữ liệu', error)
            toast.error('Lỗi xảy ra khi truy suất task')
        }
    }

    const filteredTasks = taskBuffer.filter((task) => {
        switch (filter) {
            case 'active':
                return task.status === 'active'
            case 'pending':
                return task.status === 'pending'
            case 'completed':
                return task.status === 'completed'
            default:
                return true
        }
    })
    
    const visibleTasks = filteredTasks.slice(
        (page - 1) * visibleTasksDisplay,
        page * visibleTasksDisplay
    )

    const totalPages = Math.ceil(filteredTasks.length / visibleTasksDisplay)

    useEffect(() => {
        if (visibleTasks.length === 0 && page > 1) {
            setPage((prev) => prev - 1)
        }
    }, [visibleTasks.length, page])

    useEffect(() => {
        fetchData()
    }, [dateQuery]);

    useEffect(() => {
        setPage(1)
    }, [filter, dateQuery]);


    const handleNext = () => {
        if (page < totalPages) {
            setPage((prev) => prev + 1)
        }
    }

    const handleBack = () => {
        if (page > 1) {
            setPage((prev) => prev - 1)
        }
    }

    const randomPageChanges = (newPage) => {
        setPage(newPage)
    }


    const handleTaskChanged = () => {
        fetchData()
    }

    return (
        <div className="min-h-screen w-full relative overflow-hidden">
        {/* Aurora Dream Corner Whispers */}
        <div
            className="absolute inset-0 z-0"
            style={{
            background: `
                radial-gradient(ellipse 85% 65% at 8% 8%, rgba(175, 109, 255, 0.42), transparent 60%),
                radial-gradient(ellipse 75% 60% at 75% 35%, rgba(255, 235, 170, 0.55), transparent 62%),
                radial-gradient(ellipse 70% 60% at 15% 80%, rgba(255, 100, 180, 0.40), transparent 62%),
                radial-gradient(ellipse 70% 60% at 92% 92%, rgba(120, 190, 255, 0.45), transparent 62%),
                linear-gradient(180deg, #f7eaff 0%, #fde2ea 100%)
            `,
            }}
        />

        {/* Diagonal Striped Grid Spotlight Background */}
        <div
            className="absolute inset-0 z-10"
            style={{
            backgroundImage: `
                linear-gradient(90deg, rgba(16,185,129,0.25) 1px, transparent 0),
                linear-gradient(180deg, rgba(16,185,129,0.25) 1px, transparent 0),
                repeating-linear-gradient(45deg, rgba(16,185,129,0.2) 0 1px, transparent 1px 6px)
            `,
            backgroundSize: "24px 24px, 24px 24px, 24px 24px",
            }}
        />
            
        {/* Spotlight overlay */}
        {/* <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
            background: `
                radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 40%)
            `,
            mixBlendMode: "overlay",
            animation: "spotlight 8s ease-in-out infinite",
            }}
        /> */}
            <PetStickers/>

        {/* Content */}
            <div className="container mx-auto pt-8 z-30 relative">
                <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
                    <Header />
                    
                    <AddTask
                        handleNewTasksAdded={handleTaskChanged}
                    />
                    
                    <StatsAndFilter
                        activeTaskCount={activeTaskCount}
                        pendingTaskCount={pendingTaskCount}
                        completedTaskCount={completedTaskCount}
                        totalTasks={totalTasks}
                        filter={filter}
                        setFilter={setFilter}
                    />
                    
                    <TaskList
                        filteredTasks={visibleTasks}
                        filter={filter}
                        handleTaskChanged={handleTaskChanged}
                    />
                    
                    <div className="flex flex-col justify-between items-center gap-6 sm:flex-row">
                        <TaskListsPagination
                            page={page}
                            totalPages={totalPages}
                            handleNext={handleNext}
                            handleBack={handleBack}
                            randomPageChanges={randomPageChanges}
                        />

                        <DateTimeFilter
                            dateQuery={dateQuery}
                            setDateQuery={setDateQuery}
                        />
                    </div>
                    
                    <Footer
                        activeTaskCount={activeTaskCount}
                        completedTaskCount={completedTaskCount}
                        pendingTaskCount={pendingTaskCount}

                    />
                </div>
            </div>
        </div>
    );
};

export default Homepage;




{/* <div className="min-h-screen w-full relative">
    
    <div
        className="absolute inset-0 z-0"
        style={{
        background: `linear-gradient(225deg, #FFB3D9 0%, #FFD1DC 20%, #FFF0F5 40%, #E6F3FF 60%, #D1E7FF 80%, #C7E9F1 100%)`,
        }}
    />
    
    <div className="container mx-auto pt-8 z-10 relative">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
            <Header />
            
            <AddTask />

            <StatsAndFilter />
            
            <TaskList />

            <div className="flex flex-col justify-between items-center gap-6 sm:flex-row">
                <TaskListsPagination />
                <DateTimeFilter/>
            </div>
            
            <Footer/>
        </div>
    </div>
</div > */}



