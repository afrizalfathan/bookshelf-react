import { Button } from "react-bootstrap"
import { faTrash, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Book = ({ buku, deleteButtonHandler }) => {
    return (
        <div className="book" key={buku.id}>
            <div className="book-detail">
                <h4>{buku.judul}</h4>
                <p>{buku.tahun}</p>
                <p>{buku.penulis}</p>
            </div>

            <div className="button-confirmation">
                <Button variant="success">
                    <FontAwesomeIcon icon={faCheck} />
                </Button>

                <Button variant="primary">
                    <FontAwesomeIcon icon={faXmark} />
                </Button>
                <Button
                    variant="warning"
                    onClick={deleteButtonHandler.bind(this, buku.id)}
                >
                    <FontAwesomeIcon icon={faTrash} />
                </Button>
            </div>
        </div>
    )
}

export default Book
