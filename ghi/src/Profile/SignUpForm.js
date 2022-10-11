

export default function SignUpForm() {
    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Sign Up Form</h1>
                    <form>
                        <div className="mb-3">
                            <input placeholder="Username" required type="text" />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="mb-3">
                            <input placeholder="Password" required type="password" />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="mb-3">
                            <input placeholder="City" required type="text" />
                            <label htmlFor="city">City</label>
                        </div>
                        <div className="mb-3">
                            <select required>
                                <option value="">Select a State</option>
                                <option>Value1</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <input placeholder="Dog Name" required type="text" />
                            <label htmlFor="dog name">Dog Name</label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}