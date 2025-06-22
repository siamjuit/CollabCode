"use client"

import React from 'react'
import Header from "@/features/landing/components/header";
import Hero from "@/features/landing/components/hero";
import Stats from "@/features/landing/components/stats";
import Features from "@/features/landing/components/features";
import Cta from "@/features/landing/components/CTA";

const page = () => {

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
            {/*/!* Header *!/*/}
            {/*<Header />*/}

            {/* Hero Section */}
            <Hero />

            {/* Stats Section */}
            <Stats />

            {/* Features Section */}
            <Features />

            {/* CTA Section */}
            <Cta />
        </div>
    )
}

export default page;
