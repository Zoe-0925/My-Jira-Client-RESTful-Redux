import React, { useState, Fragment } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

//Board should render DragAndDrop, and DragAndDrop render SingleColumn

// code openTaskDetail and place the modal 

// The droppables are columns and the draggables are the IssueCards

//TODO: This is an issue card
function IssueCard({ task, openTaskDetail }) {
  const labelsFormatted = task === undefined || task.labels.length === 0 ? "" :
    task.labels.map(each => <p className="label">{each}</p>)

  if (task.issueType === undefined || task.summary === undefined) { return <div></div> }

  return (
    <div className="epic-body" onClick={() => openTaskDetail(task._id)}>
      <p className="summary">{task.summary}</p>
      <div className="labels">{labelsFormatted}</div>
      <div className="issueType tab row">
        <div>
          <Tooltip title={task.issueType} aria-label={task.issueType}>
            {task.issueType === "Task" ?
              <CheckBoxIcon style={{ color: "#5BC2F2" }} /> : <AllInboxIcon style={{ color: "#A64BED" }} />}
          </Tooltip>
          <Tooltip title={task.summary} aria-label={task.summary}>{task.summary}</Tooltip>
        </div>
        <Tooltip title={task.assignee} aria-label={task.assignee}><AccountCircleIcon /></Tooltip>
      </div>
    </div>

  )
}

const getTasks = ({ statusId, openTaskDetail }) => {
  const tasks = useSelector(state => state.IssueReducer).issues.find(item => Object.keys(item)[0] === statusId)
  const items = tasks !== undefined && tasks.length > 0 ?
    tasks.map(each => <IssueCard task={each} openTaskDetail={openTaskDetail} />) :
    <div></div>

  return { items }
}

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  //TODO: change the droppableId of the draggable

  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

export default function QuoteApp() {
  const [state, setState] = useState([getItems(10), getItems(5, 10)]);

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      //If I need to change the array to map, 
      //Need to update here

      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter(group => group.length));
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setState([...state, []]);
        }}
      >
        Add new group
      </button>
      <button
        type="button"
        onClick={() => {
          setState([...state, getItems(1)]);
        }}
      >
        Add new item
      </button>
      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  {el.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around"
                            }}
                          >
                            {item.content}
                            <button
                              type="button"
                              onClick={() => {
                                const newState = [...state];
                                newState[ind].splice(index, 1);
                                setState(
                                  newState.filter(group => group.length)
                                );
                              }}
                            >
                              delete
                            </button>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}
