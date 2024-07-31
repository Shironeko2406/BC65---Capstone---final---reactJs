import React from 'react'
import { useParams } from 'react-router-dom';

type Props = {}

const ProjectDetail = (props: Props) => {
    const params = useParams();
    const {id} = params
  return (
    <div>{id}</div>
  )
}

export default ProjectDetail