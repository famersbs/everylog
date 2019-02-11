import React from 'react'

const TagSelectBox = props => {
  const {spec, value, onChange} = props
  return (
    <div>
      <span>{spec.label}</span>
      {spec.items.map(i => (
        <button
          key={i.value}
          className={ i.value === value ? "tag active" : "tag" }
          onClick={() => onChange(i.value)}
        >
          {i.label}
        </button>
      ))}
    </div>
  )
}

export default TagSelectBox
