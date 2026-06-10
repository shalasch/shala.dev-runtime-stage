const MARK = { position: 'absolute', color: 'rgba(0,0,0,0.15)', fontSize: 10, lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }

export default function CornerMarks() {
  return (
    <>
      <span style={{ ...MARK, top: -5, left: -4 }}>+</span>
      <span style={{ ...MARK, top: -5, right: -4 }}>+</span>
      <span style={{ ...MARK, bottom: -5, left: -4 }}>+</span>
      <span style={{ ...MARK, bottom: -5, right: -4 }}>+</span>
    </>
  )
}
