import React from 'react'
import {Image, Video, Transformation} from 'cloudinary-react'
// import {extractCloudinaryPublicIdImage} from '../utils/index.js'

export default (props) => {
  if (props.link || props.publicId) {
    return (
      <Image {...props} onLoad={props.onLoad} publicId={props.link ? extractCloudinaryPublicIdImage(props.link) : props.publicId} >
        <Transformation dpr="auto" gravity="auto" height={props.height} quality="auto:best" width={props.width} crop="fill" fetchFormat='auto' />
      </Image>
    )
  } else {
    const err = new Error('Image componant needs either an image "link" prop or a "publicId" from cloudinary')
    console.error(err);
    return false
  }
}

export function extractCloudinaryPublicIdImage (link) {
  const indexOfAricma = link.indexOf('vonLuck', 'https://res.cloudinary.com/aricma/'.length)
  return link.slice(indexOfAricma, link.length);
}
