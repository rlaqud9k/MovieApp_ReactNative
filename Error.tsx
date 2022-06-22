export const firebaseAuthError = (e: string): string => {
  let message: string = ''

  switch (e) {
    case 'auth/email-already-in-use':
      message = '登録されているメールアドレスです。'
      break
    case 'auth/invalid-email':
      message = '正しいメールアドレスではありません。'
      break
    case 'auth/wrong-password':
      message = '登録されているメールアドレスです。'
      break
    case 'auth/user-not-found':
      message = '存在しないユーザーです。'
      break
    case 'auth/weak-password':
      message = 'パスワードが短すぎます。'
      break
    case 'auth/missing-email':
      message = 'メールアドレスを入力してください。'
      break
    case 'auth/internal-error':
      message = 'サーバーから予想ぬエラーが発生しています。'
      break
    default:
      message = '予想以外のエラーが発生しました。'
      break
  }
  return message
}
