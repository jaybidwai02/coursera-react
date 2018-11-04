import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';
const DishDtails = ({dish}) => {
	const element = dish && (
			<div className="row">
		      <div  className="col-12 col-md-5 m-1">
				<Card>
		            <CardImg top src={dish.image} alt={dish.name} />
		            <CardBody>
		              <CardTitle>{dish.name}</CardTitle>
		              <CardText>{dish.description}</CardText>
		            </CardBody>
		        </Card>
	          </div>
	          <div  className="col-12 col-md-5 m-1 text-left">
	          	<h2>Comments</h2>
	          	<ul className="list-unstyled">
	          	{dish.comments.map((comment, index) => (
					<li key={comment.id}>
						<p>{comment.comment}</p>
						<p><span>--{comment.author}</span>,<span>{comment.date}</span></p>
					</li>))
				}
				</ul>				
	          </div>
	        </div>
	);
	const emptyDiv = (<div></div>);
	return (
		<div>
			{dish != null ? element : emptyDiv}
		</div>
	);
};

export default DishDtails;
