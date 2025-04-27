import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Axios } from "../../Api/axios";

export default function TableShow(props){
    const currentUser = props.currentUser || {
      name: ""
    }; //default value it can be exite or no because not every table contains this props
    

    // Header Show
    const headerShow = props.header.map((item) => <th>{item.name}</th>);
    // Body Show
    // console.log(data)
    const dataShow = props.data.map((item, key) => (
       <tr key={key}>
        <td>{key+1} </td>
        {props.header.map((item2, key2) => (
        <td key={key2}>{ item2.key === "image" ?(
          <img width="50px" src={item[item2.key]} />
        )
         : item[item2.key]  === "3"
        ? 'admin' 
        : item[item2.key]  === "1" 
        ? 'User'
         : item[item2.key] === "2" 
        ? 'Donner'
        : item[item2.key]  }
        {currentUser && item[item2.key] === currentUser.name && "(You)"}
        </td>
    ))}
     <td >
              <div class="d-flex align-items-center gap-2">
            <Link to={`${item.id}`} >
              <FontAwesomeIcon fontSize={"19px"} icon={faPenToSquare} />
            </Link>
            {currentUser.name !== item.name && (
              <FontAwesomeIcon
              onClick={() => props.delete(item.id)} 
              fontSize={"19px"}
              color="red"
              cursor={"pointer"}
              icon={faTrash} 
              />
              )}
            </div>
            </td>
    </tr>
    )
  // console.log(item.id);
  )
// console.log(item.id);

    //Return data
    return(
        <Table striped bordered hover>
      <thead>
        <tr>
            <th>الرقم</th>
            {headerShow}
          <th>الحذف أو التعديل</th> 
        </tr>
      </thead>
      <tbody>
        {props.data.length === 0 && (
        <tr class="text-center">
          <td colSpan={12}>يتم التحميل...</td>
        </tr>
        )}
      {dataShow}
     </tbody>
    </Table>
    );

}
