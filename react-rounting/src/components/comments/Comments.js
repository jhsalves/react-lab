import { useEffect, useState } from 'react';
import useHttp, { requestStatus } from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';

import classes from './Comments.module.css';
import CommentsList from './CommentsList';
import NewCommentForm from './NewCommentForm';

const Comments = (props) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const {sendRequest: getCommentList, status, data, error} = useHttp(getAllComments);
  const [isCommentAdded, setIsCommentAdded] = useState(false);

  const commentAddedHandler = () => {
    setIsCommentAdded(true);
  };

  const addingCommentHandler = () =>{
    setIsAddingComment(true);
  }

  useEffect(()=>{
    if(isCommentAdded || !status){
      getCommentList(props.quoteId);
    }
    if(status === requestStatus.completed){
      setIsCommentAdded(false);
      setIsAddingComment(false);
      return;
    }
  },[status, error, getCommentList, data, props.quoteId, isCommentAdded])
  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={addingCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={props.quoteId} commentAdded={commentAddedHandler} />}
      <CommentsList comments={data || []} />
    </section>
  );
};

export default Comments;
