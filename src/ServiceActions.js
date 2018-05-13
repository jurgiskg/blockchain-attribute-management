import React from 'react';

export default class ServiceActions extends React.Component {

    getAttribute = () => {
        this.props.attributeStoreInstance.getAttribute.call(this.refs.getAttributeId.value,
            this.props.userAddress,
            this.refs.getAttributeFromAddress.value,
            { from: this.refs.getAttributeFromAddress.value }
        ).then((result) => {
            console.log(result)
        })
    }

    requestAttributeAccess = () => {
        this.props.attributeStoreInstance.requestAccess(this.refs.requestAttributeId.value,
            this.props.userAddress,
            { from: this.refs.requestAttributeFromAddress.value }
        ).then((result) => {
            console.log(result);
        })
    }

    registerService = () => {
        this.props.serviceRegisterInstance.register(this.refs.registrationCode.value,
            { from: this.refs.registerServiceAddress.value }
        ).then((result) => {
            console.log(result);
        })
    }

    render = () => {
        return (
            <div className="pure-g" style={{ "borderTop": "1px solid" }}>
                <div className="pure-u-1-1">
                    <h2>Service actions</h2>
                </div>
                <div className="pure-u-1-4">
                    <h3>Register service</h3>
                    <div>
                        <label>Secret registration code</label>
                        <input ref="registrationCode" />
                    </div>
                    <div>
                        <label>Address to send from</label>
                        <input ref="registerServiceAddress" />
                    </div>
                    <button onClick={this.registerService}>Send</button>
                    <div>Check console for result</div>
                </div>
                <div className="pure-u-1-4">
                    <h3>Get attribute</h3>
                    <div>
                        <label>Attribute Id </label>
                        <input ref="getAttributeId" />
                    </div>
                    <div>
                        <label>Adress to send from</label>
                        <input ref="getAttributeFromAddress" />
                    </div>

                    <button onClick={this.getAttribute}>Send</button>
                    <div>Check console for result</div>
                </div>
                <div className="pure-u-1-4">
                    <h3>Request attribute access</h3>
                    <div>
                        <label>Attribute Id </label>
                        <input ref="requestAttributeId" />
                    </div>
                    <div>
                        <label>Adress to send from</label>
                        <input ref="requestAttributeFromAddress" />
                    </div>

                    <button onClick={this.requestAttributeAccess}>Send</button>
                    <div>Check console for result</div>
                </div>
            </div>
        )
    }
}