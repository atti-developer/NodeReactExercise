import React, { useState } from 'react';
import * as RB from "react-bootstrap";
import { Row } from "react-bootstrap";

import { POST_GLOSSORY } from "../../Utils/api"
import Modal from "../../Components/Common/Modal";

const AddGlossary = (
    { AddModal, setAddModal, apiCall }
) => {
    const [FormData, setFormData] = useState({});
    const [ErrorMsg, setErrorMsg] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [ModelMsg, setModelMsg] = useState("");

    const modelSet = async () => {
        setIsOpen(true);
    };
    const handleChange = (e) => {
        let { name, value } = e.target;
        setErrorMsg("")
        const data = { ...FormData }
        data[name] = value
        setFormData(data)
    }

    const closeModal = () => {
        setAddModal(false);
    }

    const addGlossaryData = async () => {
        let { terms, definitions } = FormData;

        if (!terms || !definitions) {
            setErrorMsg("please fill requirment fields!");

        } else {
            const res = await POST_GLOSSORY(FormData);
            let { status, msg } = res;
            setModelMsg(msg);
            modelSet();
            if (status === true) {
                // console.log(FormData);
                setFormData({});
                setErrorMsg("");
                apiCall();
                closeModal();
            } else {
                setErrorMsg(msg)
            }
        }

    }

    return (
        <div>
            <RB.Modal show={AddModal} onHide={closeModal} className="ordermanage_modal">
                <RB.Modal.Header closeButton>
                    <RB.Modal.Title>Add New Glossary</RB.Modal.Title>
                </RB.Modal.Header>
                <RB.Modal.Body>
                    <RB.Row>
                        <RB.Col lg={12} md={12}>
                            <RB.Row>
                                <RB.Col lg={12} md={12}>
                                    <RB.Form>
                                        <RB.Form.Group as={Row} controlId="terms_id">
                                            <RB.Col lg={4} md={4}>
                                                <RB.Form.Label>Terms :</RB.Form.Label>

                                            </RB.Col>
                                            <RB.Col lg={7} md={8}>
                                                <RB.Form.Control
                                                    type="text"
                                                    name="terms"
                                                    placeholder="Terms..."
                                                    onChange={handleChange}
                                                />
                                                <p className="text-danger"> {ErrorMsg !== "" ? ErrorMsg : ""}</p>
                                            </RB.Col>
                                        </RB.Form.Group>
                                        <RB.Form.Group as={Row} controlId="terms_id">
                                            <RB.Col lg={4} md={4}>
                                                <RB.Form.Label>Definitions :</RB.Form.Label>
                                            </RB.Col>
                                            <RB.Col lg={7} md={8}>
                                                
                                                 <RB.Form.Control
                                                    as="textarea"
                                                    name="definitions"
                                                    placeholder="Definitions...."
                                                    onChange={handleChange}
                                                />
                                                <p className="text-danger"> {ErrorMsg !== "" ? ErrorMsg : ""}</p>

                                            </RB.Col>
                                        </RB.Form.Group>
                                        <RB.Row>
                                            <RB.Col lg={4} md={4}></RB.Col>
                                            <RB.Col lg={6} md={7}>
                                                <RB.Button
                                                    size="sm" variant="primary"
                                                    onClick={addGlossaryData}
                                                >
                                                    SUBMIT
                                                </RB.Button>
                                            </RB.Col>
                                        </RB.Row>
                                    </RB.Form>
                                </RB.Col>
                            </RB.Row>
                        </RB.Col>
                    </RB.Row>
                </RB.Modal.Body>
            </RB.Modal>
            <Modal text={ModelMsg} open={isOpen} onClose={() => setIsOpen(false)} />

        </div>
    )
}

export default AddGlossary;