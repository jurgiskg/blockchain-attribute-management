import React from 'react';

class UserActions extends React.Component {

    getAttributeAsUser = () => {
        this.props.attributeStoreInstance.getAttribute.call(this.refs.getAttributeAsUserId.value,
            this.props.userAddress,
            this.refs.getAttributeAsUserAddress.value).then((result) => {
                console.log(result);
            })
    }

    removeAccess = () => {
        this.props.attributeStoreInstance.removeAccess(this.refs.removeAttributeId.value,
            this.refs.removeServiceAddress.value
        ).then((result) => {
            console.log(result);
        })
    }

    grantAccess = () => {
        this.props.attributeStoreInstance.grantAccess(this.refs.attributeId.value,
            this.refs.serviceAddress.value,
            this.refs.attributeValue.value
        ).then((result) => {
            console.log(result);
        })
    }

    render = () => {
        return (<div className="pure-g" style={{ "borderTop": "1px solid" }}>
            <div className="pure-u-1-1">
                <h2>User actions</h2>
            </div>
            <div className="pure-u-1-4">
                <h3>Grant access</h3>
                <div>
                    <label>Attribute Id </label>
                    <input ref="attributeId" />
                </div>
                <div>
                    <label>Attribute value </label>
                    <input ref="attributeValue" />
                </div>
                <div>
                    <label>Service address </label>
                    <input ref="serviceAddress" />
                </div>

                <button onClick={this.grantAccess}>Send</button>
                <div>Check console for result</div>
            </div>
            <div className="pure-u-1-4">
                <h3>Remove access</h3>
                <div>
                    <label>Attribute Id </label>
                    <input ref="removeAttributeId" />
                </div>
                <div>
                    <label>Service address </label>
                    <input ref="removeServiceAddress" />
                </div>

                <button onClick={this.removeAccess}>Send</button>
                <div>Check console for result</div>
            </div>
            <div className="pure-u-1-4">
                <h3>Get attribute</h3>
                <div>
                    <label>Attribute Id </label>
                    <input ref="getAttributeAsUserId" />
                </div>
                <div>
                    <label>Service address </label>
                    <input ref="getAttributeAsUserAddress" />
                </div>
                <button onClick={this.getAttributeAsUser}>Send</button>
                <div>Check console for result</div>
            </div>

        </div>)
    }
}

export default UserActions