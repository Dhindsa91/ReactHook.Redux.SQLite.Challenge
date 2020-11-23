import React from 'react';
import { Link } from "react-router-dom";



export default function NavMenu() {
    return (
        <header className="app-header">
            <Link className="link" to="/"><h3 className="app-heading">Cash Live Assignment - Arvind Dhindsa</h3></Link><Link to="/login"><button className="btn btn-secondary">Login</button></Link>
        </header>
    )
}
