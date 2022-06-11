import React, { useState, useEffect } from 'react';
import * as RB from "react-bootstrap";
import { Row } from "react-bootstrap";
import { UPDATE_GLOSSORY } from "../../Utils/api"
import Modal from "../../Components/Common/Modal";

const EditGlossary = (
    { setEdit, show_editCustomer, userData, apiCall }
) => {
    const [FormData, setFormData] = useState({});

    const [isOpen, setIsOpen] = useState(false);
    const [ModelMsg, setModelMsg] = useState("");
    const modelSet = async () => {
        setIsOpen(true);
    };
    const handleChange = (e) => {
        let { name, value } = e.target;
        const data = { ...FormData }
        data[name] = value
        setFormData(data)
    }

    const closeModal = () => {
        setEdit(false)
    }

    const UpdateGlossary = async () => {
        const res = await UPDATE_GLOSSORY(FormData);
        console.log(res)
        let { msg,status } = res;
        setModelMsg("RECORD UPDATED SUCCESSFULLY");
        modelSet();
        if (status) {
            apiCall()
            setEdit(false)
        }
        // console.log(res)
        // console.log(`lets edit country ${JSON.stringify(userData)}, ${JSON.stringify(FormData)}`)
    }

    useEffect(() => {
        setFormData(userData)
    }, [userData])
    return (
        <div>
            <RB.Modal show={show_editCustomer} onHide={closeModal} className="ordermanage_modal">
                <RB.Modal.Header closeButton>
                    <RB.Modal.Title>UPDATE RECORD</RB.Modal.Title>
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
                                                    value={FormData.terms}
                                                    onChange={handleChange}
                                                />
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
                                                    value={FormData.definitions}
                                                    onChange={handleChange}
                                                />

                                            </RB.Col>
                                        </RB.Form.Group>
                                        <RB.Row>
                                            <RB.Col lg={4} md={4}></RB.Col>
                                            <RB.Col lg={6} md={7}>
                                                <RB.Button
                                                    size="sm" variant="primary"
                                                    onClick={UpdateGlossary}
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

export default EditGlossary