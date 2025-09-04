import './Banner.css';
import { Link } from 'react-router-dom';
function Banner()
{
    return(
        <>
        <div className='bannerdiv'>
            <div className="overlay">
            <h1 id='bannertitle'>WELCOME TO STUDENT BLOG<br/> <br/><div className='start'><Link to={'/tpp'}><button className="btn btn-primary"> Lets Start</button></Link></div></h1>
                
            </div>    
        <img src="/media/bannerimg.png" alt="" width={'100%'} height={'650px'} style={{objectFit:'cover'}} />
        </div>
        </>
    )
}
export default Banner;