import React, { useEffect, useRef, useState } from 'react'

export function CustomInputArea({ className, clearFlag = false, setClearFlag, setValue, loading }: { className?: string, clearFlag?: boolean, setClearFlag: Function, setValue: Function, loading: boolean })
{
  const ref = useRef(null);

  useEffect(() =>
  {
    if (clearFlag)
    {
      ref.current.value = "";
      setClearFlag(false);
    }
  }, [clearFlag])

  useEffect(() =>
  {
    ref.current.disabled = !loading
  }, [loading])
  // // 現在 IME ON（変換中）かどうかのフラグ
  // const isImeOn = useRef(false)

  // // 以前の入力テキスト（ブラウザごとの onChange の振る舞いの差異への対策）
  // //const [prevText, setPrevText] = useState('')

  // // 入力テキストを処理する
  // const handleChange = (text: string) => {
  //   if (value === text) return
  //   if (text === '') {
  //     // Chrome ではテキストクリア時に onCompositionEnd が呼ばれないことがある
  //     isImeOn.current = false
  //   } else if (isImeOn.current) {
  //     return // IME 変換中は何もしない
  //   }
  //   setValue(text)

  //   // ここで最新の入力値にもとづいて検索処理などを行う
  //   console.log(text)
  // }
  // input properties
  // onCompositionStart={() => {
  //   isImeOn.current = true // IME 入力中フラグを ON
  // }}
  // onCompositionEnd={(e) => {
  //   isImeOn.current = false // IME 入力中フラグを OFF
  //   handleChange((e.target as HTMLInputElement).value) // 入力確定したとき
  // }}
  const handleInputChange = (event) =>
  {
    setValue(event.target.value);
  };
  return (<>
    <input
      className={className}
      type='text'
      ref={ref}
      onChange={handleInputChange}
      style={{ "pointerEvents": "auto" }}
    ></input>
  </>)
}
