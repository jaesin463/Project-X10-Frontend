import React, { useState, useEffect, useCallback } from "react";
import Sortable from "sortablejs";
import {
  getToDoList,
  addToDoList,
  updateToDoList,
  deleteToDoList,
} from "../api/api";
import styles from "./ToDoList.module.css";
import classNames from "classnames";

const TodoList = ({ userId }) => {
  const [todoList, setTodoList] = useState([]);
  const [inProgressList, setInProgressList] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [num, setNum] = useState(0);

  const handleUpdateTodo = useCallback(
    (id, state, todo) => {
      updateToDoList({
        todoId: id,
        userId: userId,
        todoState: state,
        todo: todo,
      });
    },
    [userId]
  );
  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      addToDoList({ userId: userId, todoState: 0, todo: newTodo });
      setTodoList([
        ...todoList,
        {
          todoId: num,
          userId: userId,
          todoState: 0,
          todo: newTodo,
        },
      ]);
      setNewTodo("");
      setNum(num + 1);
    }
  };

  const handleDeleteTodo = (deletedTodo) => {
    // todoList에서 삭제
    const updatedTodoList = todoList.filter(
      (item) => item.todoId !== deletedTodo.todoId
    );
    setTodoList(updatedTodoList);

    // inProgressList에서 삭제
    const updatedInProgressList = inProgressList.filter(
      (item) => item.todoId !== deletedTodo.todoId
    );
    setInProgressList(updatedInProgressList);

    // completedList에서 삭제
    const updatedCompletedList = completedList.filter(
      (item) => item.todoId !== deletedTodo.todoId
    );
    setCompletedList(updatedCompletedList);

    // 서버에서도 삭제
    deleteToDoList(deletedTodo.todoId);
  };

  useEffect(() => {
    getToDoList(userId).then((list) => {
      console.log("리스트입니다.", list);
      let todo1 = [];
      let todo2 = [];
      let todo3 = [];
      for (let i of list) {
        if (i.todoState === 0) {
          todo1.push(i);
        } else if (i.todoState === 1) {
          todo2.push(i);
        } else {
          todo3.push(i);
        }
        setNum(i.todoId + 1);
      }
      setTodoList([...todo1]);
      setInProgressList([...todo2]);
      setCompletedList([...todo3]);
    });
  }, [userId]);

  useEffect(() => {
    const todoSortable = new Sortable(document.getElementById("todo-list"), {
      group: "shared-list",
      swapThreshold: 1,
      animation: 150,
      onEnd: function (evt) {
        // 안전성 검사 추가
        const item = evt.to.outerHTML.charAt(8);
        const state = item === "t" ? 0 : item === "i" ? 1 : 2;
        console.log("드래그한곳:", item);
        if (evt.item.children[0] && evt.item.children[1]) {
          const todo = evt.item.children[0].textContent.slice(0, -1);
          const id = parseInt(evt.item.children[1].textContent);
          console.log("드래그 중인 아이템의 텍스트 내용:", todo, id);
          handleUpdateTodo(id, state, todo);
        } else {
          console.error("드래그 중인 아이템이 올바르게 설정되지 않았습니다.");
        }
      },
    });

    const inProgressSortable = new Sortable(
      document.getElementById("in-progress-list"),
      {
        group: "shared-list",
        swapThreshold: 1,
        animation: 150,
        onEnd: function (evt) {
          // 안전성 검사 추가
          const item = evt.to.outerHTML.charAt(8);
          const state = item === "t" ? 0 : item === "i" ? 1 : 2;
          console.log("드래그한곳:", item);
          if (evt.item.children[0] && evt.item.children[1]) {
            const todo = evt.item.children[0].textContent.slice(0, -1);
            const id = parseInt(evt.item.children[1].textContent);
            console.log("드래그 중인 아이템의 텍스트 내용:", todo, id);
            handleUpdateTodo(id, state, todo);
          } else {
            console.error("드래그 중인 아이템이 올바르게 설정되지 않았습니다.");
          }
        },
      }
    );

    const completedSortable = new Sortable(
      document.getElementById("completed-list"),
      {
        group: "shared-list",
        swapThreshold: 1,
        animation: 150,
        onEnd: function (evt) {
          // 안전성 검사 추가
          const item = evt.to.outerHTML.charAt(8);
          const state = item === "t" ? 0 : item === "i" ? 1 : 2;
          console.log("드래그한곳:", item);
          if (evt.item.children[0] && evt.item.children[1]) {
            const todo = evt.item.children[0].textContent.slice(0, -1);
            const id = parseInt(evt.item.children[1].textContent);
            console.log("드래그 중인 아이템의 텍스트 내용:", todo, id);
            handleUpdateTodo(id, state, todo);
          } else {
            console.error("드래그 중인 아이템이 올바르게 설정되지 않았습니다.");
          }
        },
      }
    );

    return () => {
      todoSortable.destroy();
      inProgressSortable.destroy();
      completedSortable.destroy();
    };
  }, [todoList, inProgressList, completedList, handleUpdateTodo]);

  return (
    <div className={styles.box}>
      <div className={styles.list}>
        <h2>할일 목록</h2>
        <ul id="todo-list" className={styles.ul}>
          {todoList.map((item) => (
            <li
              key={`todo-${item.todoId}`}
              className={classNames(styles.li, styles.before)}
            >
              <div className={styles.libox}>
                <div>{item.todo}</div>
                <div onClick={() => handleDeleteTodo(item)}>-</div>
              </div>
              <div className={styles.none}>{item.todoId}</div>
            </li>
          ))}
        </ul>
        <div className={styles.add}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="새로운 할일 추가"
          />
          <div onClick={handleAddTodo} className={styles.button}>
            +
          </div>
        </div>
      </div>
      <div className={styles.list}>
        <h2>진행 중인 목록</h2>
        <ul id="in-progress-list" className={styles.ul}>
          {inProgressList.map((item) => (
            <li
              key={`in-progress-${item.todoId}`}
              className={classNames(styles.li, styles.progress)}
            >
              <div className={styles.libox}>
                <div>{item.todo}</div>
                <div onClick={() => handleDeleteTodo(item)}>-</div>
              </div>
              <div className={styles.none}>{item.todoId}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.list}>
        <h2>완료된 목록</h2>
        <ul id="completed-list" className={styles.ul}>
          {completedList.map((item) => (
            <li
              key={`completed-${item.todoId}`}
              className={classNames(styles.li, styles.done)}
            >
              <div className={styles.libox}>
                <div>{item.todo}</div>
                <div onClick={() => handleDeleteTodo(item)}>-</div>
              </div>
              <div className={styles.none}>{item.todoId}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
