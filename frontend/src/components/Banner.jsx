import React from 'react'

const Banner = ({content}) => {
  return (
    <div className="bg-green-700 text-white py-4 h-14 flex justify-center align-middle">
          <p className="text-center text-sm">
            {content}
          </p>
        </div>
  )
}

export default Banner
