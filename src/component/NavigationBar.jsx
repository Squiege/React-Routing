import { NavLink } from "react-router-dom";
import './NavigationBar.css';

function NavigationBar() {
    return (
        <nav>
            <NavLink to="/" activeClassName="active">Home</NavLink>
            <NavLink to="/characters" activeClassName="active">Browse Characters</NavLink>
            <NavLink to="/comics" activeClassName="active">Browse Comics</NavLink>

        </nav>
    );
}

export default NavigationBar;
