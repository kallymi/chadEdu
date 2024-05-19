<div className="dashboard-nav">
<nav className="navbar">
    <div className="container">
        <div className="logo-container">
            <img className='logo' src={image} alt="logo" />
            <span className="brand">Dashboard</span>
        </div>
        <ul className="nav-links">
            <li><Link to="/ajouter-cours">New Course</Link></li>
            <li><Link to="/NewProgram">New Program</Link></li>
            <li><Link to="/All-courses">All Course</Link></li>
            <li><Link to="/All-programs">All Program</Link></li>
            <li><Link to="/AddCourseToProgram">Add Course To Program</Link></li>
            <li><Link to="/NewClass">New Class</Link></li>
            <li><Link to="/Allclass">Voir tous les Classes</Link></li>
            <li><Link to="/DeleteProgram">Supprimer un Program</Link></li>
            <li><Link to="#" onClick={handleClose}><RiAccountCircleLine /> Se Déconnecter</Link></li>
        </ul>
    </div>
</nav>
</div>