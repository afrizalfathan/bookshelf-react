import "./style/style.css"
import { Button, InputGroup, Form } from "react-bootstrap"

const App = () => {
    return (
        <div className="App">
            <h2>Bookshelf App</h2>
            <div className="input-container">
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Judul :</Form.Label>
                        <Form.Control type="email" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Penulis :</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Tahun :</Form.Label>
                        <Form.Control type="text" />
                    </Form.Group>
                    <Form.Check
                        label="Sudah Dibaca"
                        type="switch"
                        id="custom-switch"
                    />
                    <Button
                        variant="primary"
                        type="submit"
                        className="tombol-input"
                    >
                        Masukkan Buku
                    </Button>
                </Form>
                <div className="not-read"></div>
                <div className="done-read"></div>
            </div>
        </div>
    )
}

export default App
