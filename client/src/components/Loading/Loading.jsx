import React from 'react'
import loading from '../../assets/loading.gif'

const Loading = () => {
    return (
        <div style={{ textAlign: 'center', width: '100%' }}>
            <img src={loading} alt='loading...' />
        </div>
    )
}

export default Loading