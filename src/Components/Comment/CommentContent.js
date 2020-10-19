import React from 'react'
import { ListItem, ListItemText } from '@material-ui/core';

export default function CommentContent({ comment }) {

    return (
        <div className="CommentContent">
            <ListItem>
                <ListItemText
                    primary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className="author"
                                color="textPrimary"
                            >
                                {comment.author}
                            </Typography>
                            {comment.date}
                        </React.Fragment>
                    }
                    secondary={comment.description}
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </div>
    )
}
