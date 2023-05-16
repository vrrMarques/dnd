import { useState } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";

type ItemProps = {
  id: string;
  content: string;
};

const grid = 8;

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  color: "white",
  fontWeigth: "bold",
  borderRadius: "6px",

  background: isDragging ? "lightgreen" : "rgb(244,114,182)",

  ...draggableStyle,
});

//separa

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "#333" : "#222",
  padding: grid,
  width: 250,
  border: "1px solid #999",
  borderRadius: "6px",
});

const getItems = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

const reorder = (list: ItemProps[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
export default function Home() {
  const [itemList, setItemList] = useState<ItemProps[]>(getItems(10));

  const onDragEnd = (result: DropResult) => {
    console.log(result,'result')
    if (!result.destination) {
      return;
    }

    const items = reorder(
      itemList,
      result.source.index,
      result.destination.index
    );

    if (items) {
      setItemList(items);
    }
  };

  console.log(itemList,'itemList')
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 `}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {itemList.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
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
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </main>
  );
}
