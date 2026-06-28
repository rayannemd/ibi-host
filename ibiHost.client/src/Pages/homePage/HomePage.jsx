import Dashboard from './cards/dashboard/Dashboard.jsx';
import MenuLeft from '../../components/menuLeftComponent/MenuLeft.jsx'; 
import './HomePage.css';
function HomePage() {
  return (
    <div className="containerHomePage">
      <MenuLeft />
      <div className='h1HomePage'>
            <h1>Bom trabalho!</h1>
      </div>
             

      <div className="containerMenuRight">
        <Dashboard />
      </div>
    </div>
  );
}

export default HomePage;
