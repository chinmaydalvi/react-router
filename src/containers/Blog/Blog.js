import React, { Component } from 'react';
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
		state = {
			posts: [],
			selectedPostId: null,
			error: false
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
				this.setState({error: true})
			});
		}
		
		postSelectHandler = (postId)=>{
			this.setState({selectedPostId: postId})
		}

    render () {
				let arr = <p>Something went wrong</p>;
				if(!this.state.error){
					arr = this.state.posts.map((pt)=>{
						return <Post key={pt.id} title={pt.title} author={pt.author} clicked={()=>this.postSelectHandler(pt.id)}/>;
					});
				}
				

        return (
            <div>
                <section className="Posts">
									{arr}
                </section>
                <section>
                    <FullPost selectedPostId={this.state.selectedPostId} />
                </section>
								<section>
									<NewPost />
								</section>
            </div>
        );
    }
}

export default Blog;