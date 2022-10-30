import React, {useState, useEffect, useCallback, useMemo} from "react";
import api from "constants/api";
import {apiCall} from "constants/apiCall";

import TitleBar from "components/Shop/Bar/TitleBar";
import AddressBox from "components/Shop/Box/AddressBox";

const SubTitleBar = ({msg}) => <p className="subtitle-bar"><i className="fas fa-caret-down"/> {msg}</p>

const TextBox = ({type = "text", label, ...props}) => (
  <div className="form-group">
    <label>{label}</label>
    <input type={type} {...props} className="form-control"/>
  </div>
)

const BookCover = ({image, care, doCover, quantity}) => (
  <div
    onClick={doCover}
    className={`book-cover${care ? " care" : ""}`}
    style={{"backgroundImage": `url(${image})`}}
  >
    <p>
      <i className={care ? "fas fa-bookmark" : "far fa-bookmark"}/>
      {care ? "Covered!" : "Try cover?"}
    </p>
    <p>
      <i className="fas fa-dollar-sign"/> {`${2 * quantity} ${quantity > 1 ? `( ${quantity} )` : ""}`}
    </p>
  </div>
)

const DeliveryMethod = ({select, text, change}) => (
  <p onClick={change}><i className={select ? "fas fa-check-square" : "fas fa-square"}/> {text}</p>
)

const DEFAULT_SHIPMENT = {
  receiver: "",
  address: "",
  city: "",
  country: "",
  phone: "",
}

const deliveryMethods = [
  {
    text: "Normal delivery (Get books in 2- 3 days)",
    price: 10,
    value: false
  },
  {
    text: "Fast delivery (Get books in 2 hours)",
    price: 15,
    value: true
  }
];

function SubmitCart({carts, user, order, setOrder, changeCover, changeDelivery}) {
  const [shipments, setShipments] = useState([]);
  const [shipment, setShipment] = useState(DEFAULT_SHIPMENT);
  const [openForm, setOpenForm] = useState(false);

  const toggleForm = () => setOpenForm(prev => !prev);

  let hasAddress = useMemo(() => shipments.length > 0, [shipments.length]);

  const hdSelectShipment = useCallback((data) => {
    let shipment = {...data};
    let shipment_id = shipment._id;
    delete shipment._id;
    delete shipment.user_id;
    delete shipment.__v;
    setOrder(prev => ({...prev, ...shipment, shipment_id}));
  }, [setOrder]);

  const load = useCallback(async () => {
    let shipmentData = await apiCall(...api.shipment.get(user._id));
    setShipments(shipmentData);

    if (shipmentData.length > 0) hdSelectShipment(shipmentData[0]);
  }, [hdSelectShipment, user._id]);

  useEffect(() => {
    load();
  }, [load])

  useEffect(() => {
    setOpenForm(shipments.length === 0);
  }, [shipments]);

  function hdChange(e) {
    const {name, value} = e.target;
    setShipment(prev => ({...prev, [name]: value}));
  }

  async function submitShipment() {
    let createdShipment = await apiCall(...api.shipment.create(user._id), shipment);
    setShipments(prev => ([
      ...prev,
      createdShipment
    ]))
    setShipment(DEFAULT_SHIPMENT);
  }

  async function removeShipment(shipment_id) {
    if (window.confirm("Do you want to remove this address?")) {
      await apiCall(...api.shipment.remove(user._id, shipment_id));

      let newShipments = shipments.filter(v => v._id !== shipment_id);
      setShipments(newShipments);
    }
  }

  function getDelivery() {
    const fastDeli = carts.every(c => c.fastDelivery);
    return fastDeli ? deliveryMethods : deliveryMethods.filter(d => !d.value)
  }

  return (
    <div>
      <TitleBar title="Order information" icon="fas fa-list-ul"/>
      {
        hasAddress && <div>
          <SubTitleBar msg="Shipping address"/>
          <div className="row">
            {
              shipments.map((v, i) => (
                <div className="col-md-6" key={i}>
                  <AddressBox
                    {...v}
                    defAddress={i === 0}
                    selected={v._id === order.shipment_id}
                    rm={removeShipment.bind(this, v._id)}
                    select={hdSelectShipment.bind(this, v)}
                  />
                </div>
              ))
            }
          </div>
          <p className="another-address" onClick={toggleForm}>
            <i className="far fa-plus-square"/> Use another address...
          </p>
        </div>
      }
      {openForm && <div className="address-form">
        <SubTitleBar msg="Add new address"/>
        <div className="row">
          <div className="col-md-6">
            <TextBox
              label="Receiver"
              name="receiver"
              placeholder="Enter the receiver name here..."
              onChange={hdChange}
              value={shipment.receiver}
            />
          </div>
          <div className="col-md-6">
            <TextBox
              label="Address"
              name="address"
              placeholder="Enter the address here..."
              onChange={hdChange}
              value={shipment.address}
            />
          </div>
          <div className="col-md-6">
            <TextBox
              label="City"
              name="city"
              placeholder="Enter the city here..."
              onChange={hdChange}
              value={shipment.city}
            />
          </div>
          <div className="col-md-6">
            <TextBox
              label="Country"
              name="country"
              placeholder="Enter the country here..."
              onChange={hdChange}
              value={shipment.country}
            />
          </div>
          <div className="col-md-6">
            <TextBox
              label="Phone"
              name="phone"
              placeholder="Enter the phone here..."
              type="number"
              onChange={hdChange}
              value={shipment.phone}
            />
          </div>
        </div>
        <button onClick={submitShipment}>Use this address</button>
        {hasAddress && <button onClick={toggleForm}>Cancel</button>}
      </div>}
      <SubTitleBar msg="Kafka Bookcover"/>
      <div className="book-cover-row">
        <div className="row">
          {
            carts.map((v, i) => (
              <div className="col-md-2" key={i}>
                <BookCover
                  image={v.book_id.image.url}
                  doCover={changeCover.bind(this, v._id)}
                  care={v.cover}
                  quantity={v.quantity}
                />
              </div>
            ))
          }
        </div>
      </div>
      <SubTitleBar msg="Delivery Methods"/>
      <div className="delivery-methods">
        <div className="row">
          {
            getDelivery().map((v, i) => (
              <div className="col-md-6" key={i}>
                <DeliveryMethod
                  {...v}
                  select={order.fastDelivery === v.value}
                  change={changeDelivery.bind(this, v.value, v.price)}
                />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default SubmitCart;
