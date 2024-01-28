import * as yup from "yup";

export const loginSchema = toTypedSchema(
	yup.object({
		email: yup
			.string()
			.required("Email is required")
			.email("Invalid email")
			.transform((value) => value.trim()),
		password: yup
			.string()
			.required("Password is required")
			.min(8, "Password must be at least 8 characters")
			.transform((value) => value.trim()),
	})
);

export const registerSchema = toTypedSchema(
	yup.object({
		name: yup
			.string()
			.required("Full Name is required")
			.matches(
				/^[A-Za-z]+(?:\s[A-Za-z]+)+$/,
				"Please enter both first and last name"
			)
			.transform((value) => value.trim()),
		email: yup
			.string()
			.required("Email is required")
			.email("Invalid email")
			.transform((value) => value.trim()),
		password: yup
			.string()
			.required("Password is required")
			.min(8, "Password must be at least 8 characters"),
		confirmPassword: yup
			.string()
			.required("Confirm Password is required")
			.oneOf([yup.ref("password")], "Passwords must match"),
	})
);

export const forgetPasswordSchema = toTypedSchema(
	yup.object({
		email: yup
			.string()
			.required("Email is required")
			.email("Invalid email")
			.transform((value) => value.trim()),
	})
);

export const contactSchema = toTypedSchema(
	yup.object({
		name: yup
			.string()
			.required("Name is required")
			.min(2, "Name must be at least 2 characters")
			.transform((value) => value.trim()),
		email: yup
			.string()
			.required("Email is required")
			.email("Invalid email")
			.transform((value) => value.trim()),
		subject: yup
			.string()
			.required("Subject is required")
			.min(2, "Subject must be at least 2 characters")
			.transform((value) => value.trim()),
		message: yup.string().required("Message is required"),
	})
);

export const changePassword = toTypedSchema(
	yup.object({
		oldPassword: yup.string().required("Old Password is required"),
		newPassword: yup
			.string()
			.required("Password is required")
			.min(8, "Password must be at least 8 characters"),
		confirmPassword: yup
			.string()
			.required("Confirm Password is required")
			.oneOf([yup.ref("newPassword")], "Passwords must match"),
	})
);

export const passwordRecovery = toTypedSchema(
	yup.object({
		newPassword: yup
			.string()
			.required("Password is required")
			.min(8, "Password must be at least 8 characters"),
		confirmPassword: yup
			.string()
			.required("Confirm Password is required")
			.oneOf([yup.ref("newPassword")], "Passwords must match"),
	})
);

export const fileSchema = toTypedSchema(
	yup.object({
		file: yup
			.mixed()
			.test({
				name: "fileSize",
				message: "File size is too large",
				test: (value) => isValidFileSize(value),
			})
			.test({
				name: "fileType",
				message: "Unsupported file format",
				test: (value) => isValidFileType(value),
			}),
	})
);



const allowedTypes = ["image/jpg", "image/png", "image/svg+xml", "image/gif"];
function isValidFileSize(value: any) {
	return value.size <= 5 * 1024 * 1024;
}
function isValidFileType(value: any) {
	return allowedTypes.includes(value.type);
}
