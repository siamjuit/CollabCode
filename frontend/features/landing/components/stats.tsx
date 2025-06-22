import React from 'react';

const Stats = () => {
    return (
        <section className="container mx-auto px-4 py-16 border-y border-gray-800/50">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { number: "2.5K+", label: "Active Users", color: "from-gray-500 to-gray-300" },
                    { number: "25K+", label: "Solutions Submitted", color: "from-white to-gray-400" },
                    { number: "99.9%", label: "Platform Uptime", color: "from-gray-300 to-gray-500" }
                ].map((stat, index) => (
                    <div key={index} className="text-center group hover:scale-105 transition-transform duration-200">
                        <div className={`text-4xl lg:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                            {stat.number}
                        </div>
                        <div className="text-gray-400 group-hover:text-gray-300 transition-colors">{stat.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Stats;
