import { Button } from 'react-bootstrap'
import logo from '../../assets/logo.png'
import './Header.css'

const Header = () => {
  return (
    <header className='my-header'>
      <img src={logo} className='my-logo' />
      <Button className='my-header-right-btn'>Log In</Button>
      <Button className='my-header-right-btn'>Sign Up</Button>
    </header>
  )
}

export default Header
