import { useEffect, useState } from 'react';
import './LandingPage.css'


function LandingPage({user, token, signUpShowing, setSignUpShowing, setUser, setToken}){

    return(
        <div id="landing-page">
            <div className='landing-content'>
            <h1>Welcome to the Ultimate Life Tracking Experience!</h1>
            <h3>Effortlessly Monitor and Optimize Your Health and Well-being</h3>
            <p>Introducing our revolutionary app that empowers you to track and improve three essential aspects of your life simultaneously: exercise, nutrition, and sleep. Say goodbye to the hassle of managing multiple apps or relying on memory alone. With our intuitive and user-friendly interface, you can effortlessly take control of your daily routines and make informed decisions to achieve a healthier and more balanced lifestyle.</p>
            <h2>Track Your Exercise Progress</h2>
            <p>Our app provides a comprehensive exercise tracking feature that allows you to monitor your workouts, set goals, and track your progress over time. Whether you're hitting the gym, going for a run, or practicing yoga, easily log your activities and keep an eye on your fitness journey. Stay motivated as you witness your accomplishments and make adjustments to your routines for maximum results.</p>
            <h2>Optimize Your Nutrition</h2>
            <p>Never underestimate the power of a well-balanced diet. Our app enables you to effortlessly track your nutritional intake and make smarter food choices. Keep a record of your meals, track calories, and monitor macronutrient ratios to ensure you're meeting your dietary goals. Whether you're aiming to lose weight, gain muscle, or simply maintain a healthy lifestyle, our nutrition tracking feature provides the insights and guidance you need to fuel your body optimally.</p>
            <h2>Improve Your Sleep Quality</h2>
            <p>Did you know that quality sleep is crucial for your overall well-being? Our app helps you establish and maintain healthy sleep patterns by monitoring your sleep duration and quality. Set sleep goals, track your sleep stages, and receive personalized recommendations to enhance the quality of your rest. Wake up feeling refreshed, rejuvenated, and ready to tackle the day ahead.</p>
            <h3>Take Charge of Your Life Today</h3>
            <p>With our intuitive app, you have the power to transform your life, one step at a time. Say goodbye to the guessing game and embrace a data-driven approach to health and well-being. Start tracking your exercises, optimizing your nutrition, and improving your sleep quality today. Your journey towards a healthier, happier you starts here!</p>

            </div>
            </div>
    )
}

export default LandingPage