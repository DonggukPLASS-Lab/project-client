import React from 'react'
import MenuLeft from '../components/MenuLeft'
import Header from '../components/Header'
export default function MainLayout(props) {
    const { children } = props
    return (
        <div className="row" style={{ background: '#24282A' }}>
            <div className="col span-1-of-6 left-container" >
                <MenuLeft />
            </div>
            <div className="col span-5-of-6 right-container" style={{ minHeight: '100vh' }}>
                <Header />
                {children}
            </div>
        </div>
    )
}
