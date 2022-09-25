import {Avatar, Divider} from 'antd'
import {AiFillGithub, AiFillLinkedin, AiFillTwitterCircle } from "react-icons/ai";

const Author=()=>{
    return (
        <div className='author-div comm-box'>
            <div><Avatar size={100} src='https://static.independent.co.uk/2022/08/22/15/newFile-2.jpg' /> </div>
            <div className='author-introduction'>Login in</div>
            <Divider>Links</Divider>
            <Avatar size={28} className='account'> <AiFillGithub/> </Avatar>
            <Avatar size={28} className='account'> <AiFillLinkedin/> </Avatar>
            <Avatar size={28} className='account'> <AiFillTwitterCircle/> </Avatar>
        </div> 
    )
}

export default Author