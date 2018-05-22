import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
		state = {
			post: null
		}
		
		componentDidUpdate(){
			if(this.props.selectedPostId){
				if(!this.state.post||(this.state.post && this.state.post.id !== this.props.selectedPostId)){
					axios.get('/posts/'+this.props.selectedPostId,).then((response) =>{
						this.setState({post: response.data})
					}).catch((error) => {
						console.log(error);
					});
				}
			}
		}

		deletePostHandler = ()=>{
			axios.delete('/posts/'+this.props.selectedPostId,).then((response) =>{
				console.log('Post Deleted',response)
			}).catch((error) => {
				console.log(error);
			});
		}

    render () {
				let post = (
					<div className="FullPost">
						<p>Please select a Post!</p>
					</div>
				);

				if(this.props.selectedPostId){
					post = ( <div className="FullPost">
							<p>Loading ...</p>
					</div>)
				}
        if(this.state.post){
          post = (
						<div className="FullPost">
								<h1>{this.state.post.title}</h1>
								<p>{this.state.post.body}</p>
								<div className="Edit">
										<button className="Delete">Delete</button>
								</div>
						</div>
					);     
        }
        return post;
    }
}

export default FullPost;