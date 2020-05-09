import React, { Fragment } from "react";
import Modal from "./Modal";
const Row = ({
  FirstName,
  LastName,
  Email,
  PhoneNumber,
  Status,
  remove,
  edit,
  idIndex,
  disabled,
}) => (
  <div className='data-container'>
    <div className='table-col'>{FirstName}</div>

    <div className='table-col'>{LastName}</div>

    <div className='table-col'>{Email}</div>

    <div className='table-col'>{PhoneNumber}</div>

    <div className='table-col'>{Status}</div>

    <div>
      <button
        className='modal-button'
        onClick={() => remove(idIndex)}
        disabled={disabled}
      >
        Delete
      </button>
      <button className='modal-button' onClick={(e) => edit(idIndex)}>
        Edit
      </button>
    </div>
  </div>
);

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          FirstName: "abc",
          LastName: "xyz",
          Email: "abc@gmail.com",
          PhoneNumber: "9167543678",
          Status: "Deactive",
        },
        {
          FirstName: "Seema",
          LastName: "S",
          Email: "seema@gmail.com",
          PhoneNumber: "9167543678",
          Status: "Active",
        },
        {
          FirstName: "Chandan",
          LastName: "S",
          Email: "chandan@gmail.com",
          PhoneNumber: "9123456789",
          Status: "Active",
        },
      ],
      modal: false,
      modalFirstInputName: "",
      modalLastInputName: "",
      modalEmail: "",
      modalPhoneNumber: "",
      modalStatus: "",
      edited: {},
      editable: false,
      index: 0,
      headerDetails: "",
      visible: false,
      disabled: false,
    };
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  handleFirstNameChange(e) {
    this.setState({ modalFirstInputName: e.target.value });
  }
  handleLastNameChange(e) {
    this.setState({ modalLastInputName: e.target.value });
  }
  handleEmailChange(e) {
    this.setState({ modalEmail: e.target.value });
  }
  handlePhoneNumberChange(e) {
    this.setState({ modalPhoneNumber: e.target.value });
  }
  handleStatusChange(e) {
    if (this.state.visible) {
      this.setState({ visible: false });
      this.setState({ modalStatus: "De-active" });
    } else {
      this.setState({ visible: true });
      this.setState({ modalStatus: "Active" });
    }
  }

  handleSubmit(e) {
    let data = {};
    if (
      this.state.modalFirstInputName !== "" &&
      this.state.modalLastInputName !== "" &&
      this.state.modalPhoneNumber !== "" &&
      this.state.modalStatus !== "" &&
      this.state.modalEmail !== ""
    ) {
      if (this.state.editable) {
        data = {
          FirstName: this.state.modalFirstInputName,
          LastName: this.state.modalLastInputName,
          Email: this.state.modalEmail,
          PhoneNumber: this.state.modalPhoneNumber,
          Status: this.state.modalStatus,
        };
        this.state.data.splice(this.state.index, 1, data);
      } else {
        data = {
          FirstName: this.state.modalFirstInputName,
          LastName: this.state.modalLastInputName,
          Email: this.state.modalEmail,
          PhoneNumber: this.state.modalPhoneNumber,
          Status: this.state.modalStatus,
        };
        let joined = this.state.data.concat(data);

        this.setState({ data: joined });
      }
      this.modalClose();
    } else {
      alert("Enter all the details");
    }
    this.setState({ disabled: false });
    console.log(this.state.disabled);
  }
  modalOpen(e) {
    let operation = e.target.innerHTML;

    if (operation == "Add Contact") {
      this.setState({
        modalFirstInputName: "",
        modalLastInputName: "",
        modalEmail: "",
        modalPhoneNumber: "",
        modalStatus: "De-active",
        visible: false,
      });
    }

    this.setState({ headerDetails: "Add contact details" });

    this.setState({ modal: true, disabled: true });
    this.setState({ editable: false });
  }

  modalClose() {
    this.setState({
      modalInputName: "",
      modal: false,
      disabled: true,
    });
  }

  remove = (idIndex) => {
    const id = idIndex;
    if (this.state.data.length !== 1) {
      const arrayCopy = this.state.data.filter((row, index) => id !== index);
      // const arrayCopy = this.state.data.filter((row) => row.index !== idIndex);
      this.setState({ data: arrayCopy });
    }
  };
  edit = (idIndex) => {
    const id = idIndex;
    const arrayCopy = this.state.data.filter((row, index) => {
      if (id == index) {
        return row;
      }
    });
    this.setState({ headerDetails: "Edit details" });

    let copy = arrayCopy[0];
    this.state.edited = Object.assign({}, copy);

    this.setState({
      modal: true,
      editable: true,
      disabled: true,
      modalFirstInputName: this.state.edited.FirstName,
      modalLastInputName: this.state.edited.LastName,
      modalEmail: this.state.edited.Email,
      modalPhoneNumber: this.state.edited.PhoneNumber,
      modalStatus: this.state.edited.Status,
      index: id,
    });
  };

  render() {
    const rows = this.state.data.map((rowData, index) => (
      <Row
        key={index.toString()}
        remove={this.remove}
        edit={this.edit}
        {...rowData}
        disabled={this.state.disabled}
        idIndex={index}
      />
    ));

    return (
      <div className='container'>
        <h1 className='heading'>Contact information</h1>
        {this.state.data.length > 0 && (
          <div className='table-container'>
            <div className='table-col'>First Name</div>
            <div className='table-col'>Last Name</div>
            <div className='table-col'>Email</div>
            <div className='table-col'>Phone Number</div>
            <div className='table-col'>Status</div>
          </div>
        )}
        {rows}
        <button className='modal-button' onClick={(e) => this.modalOpen(e)}>
          Add Contact
        </button>
        <br />
        <br />
        {this.state.modal && (
          <Modal
            show={this.state.modal}
            handleClose={(e) => this.modalClose(e)}
          >
            <h2>{this.state.headerDetails}</h2>
            <div className='form-group'>
              <input
                type='text'
                value={this.state.modalFirstInputName}
                name='modalFirstInputName'
                onChange={(e) => this.handleFirstNameChange(e)}
                className='form-control'
                placeholder='Enter first name'
                required
              />

              <input
                type='text'
                value={this.state.modalLastInputName}
                name='modalLastInputName'
                onChange={(e) => this.handleLastNameChange(e)}
                className='form-control'
                placeholder='Enter last name'
                required
              />

              <input
                type='email'
                value={this.state.modalEmail}
                name='modalEmail'
                onChange={(e) => this.handleEmailChange(e)}
                className='form-control'
                placeholder='Enter email'
                required
              />

              <input
                type='number'
                value={this.state.modalPhoneNumber}
                name='modalPhoneNumber'
                onChange={(e) => this.handlePhoneNumberChange(e)}
                className='form-control'
                placeholder='Enter phone number'
                required
              />
              <input
                type='button'
                value={this.state.modalStatus}
                name='modalStatus'
                onClick={this.handleStatusChange}
                className='statusBtn '
                placeholder='Enter Status'
              />
            </div>

            <div className='btn'>
              <button
                onClick={(e) => this.handleSubmit(e)}
                className='modal-button'
              >
                Save
              </button>
            </div>
          </Modal>
        )}
      </div>
    );
  }
}
