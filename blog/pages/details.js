import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import moment from 'moment'

import {Row, Col, Breadcrumb, Affix, List, Form, Input, Button, message} from 'antd'
import {AiOutlineCalendar, AiFillFolder, AiFillFire, AiFillSmile, AiFillLike } from "react-icons/ai";
import ReactMarkdown from 'react-markdown'
import Markdown from 'react-markdown'
import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import servicePath from '../config/apiUrl';

// const Details = (props) => {
export default function Details(props) {
  const articleId = props.id;
  const [commentList, setCommentList] = useState([])

  useEffect(() => {
    getComments();
  },[])

  // 获取评论列表
  const getComments = () => {
    axios(servicePath.getCommentsByArticle+articleId).then(
      res => {
        console.log(res)
        setCommentList(res.data.data)
      }
    )
  }
  
  console.log('commentList1111', commentList)









  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer:renderer,  // 渲染方式
    gfm:true,  // true: github markdown 的渲染方式
    pendantic: false,  // false: 对不符合markdown的代码进行容错
    sanitize: false,  // true: 忽略html标签
    tables: true,  // true: github样式的表格
    breaks: false,  // true: 支持github换行符
    smartLists: true,  // true: 优化列表样式
    highlight: function(code) {
      return hljs.highlightAuto(code).value;  // 监测代码是什么语言，自动高亮
    }
  })

  let html = marked(props.article_content);  // markdown -> html

  // let md2html = props.article_content;  // 从props里拿出文章内容
  // console.log("props "+props.title);
  // console.log("md2html "+md2html);

  // 评论区表单
  const {TextArea} = Input;  // 文章内容

  const [commentForm] = Form.useForm();
  const onReset = () => {
    commentForm.resetFields();
  };
  const addComment = (values) => {
    // let articleId = context.query.id;

    let dataProps = {
      userId: 1,
      article_id: articleId,
      content: values.commentContent,
      addTime: moment().format('YYYY-MM-DD HH:mm'),
      likes: 0,
      userName: 'j',
    }
    console.log('Success:', dataProps);  // 将要传到数据库里的评论

    axios({
      method:'post',
      url:servicePath.addComment,
      withCredentials: true,
      data: dataProps,
    }).then(
      res=>{
        // setCommentId(res.data.insertId);  // 新增评论成功，保存id
        if(res.data.isSuccess){
            message.success('评论成功');
            getComments();  // 重新获取评论
        } else {
            message.error('评论失败');
        }
        commentForm.resetFields();  // 保存成功后清除评论框
        message.success("Add comment successfully!")
      }
    )

  };
  const addCommentFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <div>
      <Head>
        <title>Details</title>
      </Head>
      <Header />
      <Row className='comm-main' type='flex' justify='center'>
        <Col className='comm-left' xs={24} sm={24} md={16} lg={16} xl={16} >
          <div>
            
            {/* Part1: 文章路径 */}
            <div className='bread-div'>
              <Breadcrumb>
                <Breadcrumb.Item> <a href='/'>Home Page</a> </Breadcrumb.Item>
                <Breadcrumb.Item> <a href='/'> {props.typeName} </a> </Breadcrumb.Item>
                <Breadcrumb.Item> <a href='/'>{props.title}</a> </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            
            {/* Part2: 文章标题，添加时间，内容 */}
            <div>
              <div className='details-title'>
                <a>{props.title}</a>
              </div>
              <div className='list-icon center'>
                <span><AiOutlineCalendar /> {props.addTime} </span>
                <span><AiFillFolder /> {props.typeName} </span>
                <span><AiFillFire /> {props.view_count} </span>
              </div>
              <div className='details-content' dangerouslySetInnerHTML={{ __html: html }}>
              </div>
            </div>
          </div>
        </Col>

        <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4} >
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className='details-nav cpmm-box'>
              {/* <div className='nav-title'>文章目录</div> */}
              {/* <MarkNav className='article-menu' source={md2html} headingTopOffset={0} ordered={false} /> */}
            </div>
          </Affix>
        </Col>
      </Row>

      {/* Part3: 评论区 */}
      <Row className='comm-main' type='flex' justify='center'>
        <Col className='comm-left' xs={24} sm={24} md={16} lg={16} xl={16} >
          <List 
          header={
            <div>
              <div className='comment-header'>Comments</div>
              
              <Form form={commentForm} className='comment-form' name="basic" onFinish={addComment} onFinishFailed={addCommentFailed} autoComplete="off" layout='horizontal' >
                <Row>
                <Col xs={24} sm={24} md={16} lg={16} xl={16} >
                  <Form.Item label="" name="commentContent" 
                    rules={[{required: false, message: 'Add comment',},]}>
                    {/* <Input placeholder="Add comment..."  /> */}
                    <TextArea placeholder="Add comment..."  />
                    {/* <Button type="primary" htmlType="submit"> Submit </Button> */}
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={8} lg={8} xl={8} >
                  <Form.Item>
                    <Button className='comment-btn' type="primary" htmlType="submit"> Submit </Button>
                    <Button className='comment-btn' htmlType="button" onClick={onReset}> Reset </Button>
                  </Form.Item>
                </Col>
                </Row>
                
              </Form>

            </div>}

          itemLayout="vertical"
          dataSource={commentList}
          renderItem={item=>(
            <List.Item>
              <div className='comment-icon'>
                <span><AiFillSmile /> {item.userName} </span>
                <span><AiOutlineCalendar /> {item.addTime} </span>
                <span><AiFillLike /> {item.likes} </span>
              </div>
              <div className='comment-context'>{item.content}</div>
            </List.Item>
          )}
          />
        </Col>
        <Col className='comm-right-empty' xs={0} sm={0} md={7} lg={5} xl={4} />
      </Row>
      
      <Footer />
    </div>
  )
}




/**
 * 接收(通过Link传递来的)ID，再用Axios查询数据库
 * @param {*} context 
 * @returns 
 */
Details.getInitialProps = async(context) => {

  // 获取传来的文章id
  var articleId = context.query.id;
  
  // return await axios(url).then(res => res.data.data[0])，这样会简洁点
  
  
  


  const promise = new Promise((resolve) => {
    axios.get(servicePath.getArticleById+articleId).then(
      (res1) => {
        // console.log("details -----> " + res1);
        resolve(res1.data.data[0]);
      }
    )
    // axios.get(servicePath.getCommentsByArticle+articleId).then(
    //   (res2) => {
    //     console.log("details -----> " + res2.data.data[0]);
    //     resolve(res2.data.data[0]);
    //   }
    // )
  })
  console.log('promise: ', promise)

  

  return await promise;
  // console.log(promise)

}

