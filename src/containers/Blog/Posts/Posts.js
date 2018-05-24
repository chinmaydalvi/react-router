import React, { Component } from 'react';
import Post from '../../../components/Post/Post';
import axios from '../../../axios';
import './Posts.css';

class Posts extends Component{
    state = {
      posts: []
    }

		postSelectHandler = (postId)=>{
			this.setState({selectedPostId: postId});
    }
    
    componentDidMount(){
			axios.get('/posts').then((response) =>{
				let posts = response.data.slice(0, 4);
				let updatedPost = posts.map((uPost) =>{
					return {
						...uPost,
						author: 'Max'
					}
				})
				this.setState({posts: updatedPost})
			}).catch((error) => {
				console.log(error);
				//this.setState({error: true})
			});
		}

    render(){
      let arr = <p>Something went wrong</p>;
      if(!this.state.error){
        arr = this.state.posts.map((pt)=>{
          return <Post key={pt.id} title={pt.title} author={pt.author} clicked={()=>this.postSelectHandler(pt.id)}/>;
        });
      }

      return(
        <section className="Posts">
          {arr}
        </section>
      );
    }
}

export default Posts;