function PopupConfirm({ closeModal, onConfirm, message }) {
	return (
		<div className="bg-card rounded-md w-fit px-8 pb-4">
			<p className="mb-8 text-sm text-start [text-align-last:center]">
				{message}
			</p>

			<div className="flex justify-end gap-5">
				<button
					type="button"
					onClick={closeModal}
					className="rounded-md text-sm bg-blue-100 px-3.5 py-1.5 text-gray-800 transition-all hover:bg-blue-200"
				>
					Cancle
				</button>
				<button
					type="button"
					onClick={() => {
						onConfirm()
						closeModal()
					}}
					className="rounded-md text-sm bg-orange-600 px-3.5 py-1.5 text-card transition-all hover:bg-orange-700"
				>
					Confirm
				</button>
			</div>
		</div>
	)
}

export default PopupConfirm
