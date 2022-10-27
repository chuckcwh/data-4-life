import React from 'react';
import Image from 'react-bootstrap/Image'
import IconEdit from '../assets/images/draw.png';
import IconEye from '../assets/images/eye.png';
import IconDelete from '../assets/images/delete.png';
import IconSave from '../assets/images/save.png';

export const EditIcon = (props) => {
  return (
    <Image src={IconEdit} width={20} {...props} />
  )
}

export const EyeIcon = (props) => {
  return (
    <Image src={IconEye} width={20} {...props} />
  )
}

export const DeleteIcon = (props) => {
  return (
    <Image src={IconDelete} width={20} {...props} />
  )
}

export const SaveIcon = (props) => {
  return (
    <Image src={IconSave} width={20} {...props} />
  )
}
