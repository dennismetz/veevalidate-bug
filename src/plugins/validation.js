import { configure, defineRule } from "vee-validate"
import {
	alpha,
	alpha_num as alphaNum,
	alpha_spaces as alphaSpaces,
	confirmed,
	email,
	integer,
	max,
	max_value as maxVal,
	min,
	min_value as minVal,
	numeric,
	required
} from "@vee-validate/rules"
import { localize } from "@vee-validate/i18n"

defineRule('alpha', alpha)
defineRule('alpha_num', alphaNum)
defineRule('alpha_spaces', alphaSpaces)
defineRule('email', email)
defineRule('integer', integer)
defineRule('max', max)
defineRule('max_value', maxVal)
defineRule('min', min)
defineRule('min_value', minVal)
defineRule('numeric', numeric)
defineRule('confirmed', confirmed)
defineRule('required', required)

// custom rules
defineRule('verify_password', value => {
	const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;
	return pattern.test(value)
})

defineRule('phone', value => {
	const pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
	return pattern.test(value)
})

// check for decimal numbers like 3.75 or 1,000.88 or 1.526,75
// todo: fix validation for numbers over 999.99
defineRule('decimal', (value) => {
	const decimalPattern = /^-?\d{1,3}(?:[.,]\d{3})*(?:[.,]\d+)?$/;
	return decimalPattern.test(value);
});

const validationMessages = {
	en: {
		messages: {
			"_default": "The field is not valid",
			"alpha": "The field may only contain alphabetic characters",
			"alpha_num": "The field may only contain alpha-numeric characters",
			"alpha_dash": "The field may contain alpha-numeric characters as well as dashes and underscores",
			"alpha_spaces": "The field may only contain alphabetic characters as well as spaces",
			"between": "The field must be between 0:{min} and 1:{max}",
			"confirmed": "The field confirmation does not match",
			"digits": "The field must be numeric and exactly contain 0:{length} digits",
			"dimensions": "The field must be 0:{width} pixels by 1:{height} pixels",
			"email": "The field must be a valid email",
			"not_one_of": "The field is not a valid value",
			"ext": "The field is not a valid file",
			"image": "The field must be an image",
			"integer": "The field must be an integer",
			"length": "The field must be 0:{length} long",
			"max_value": "The field must be 0:{max} or less",
			"max": "The field may not be greater than 0:{length} characters",
			"mimes": "The field must have a valid file type",
			"min_value": "The field must be 0:{min} or more",
			"min": "The field must be at least 0:{length} characters",
			"numeric": "The field may only contain numeric characters",
			"one_of": "The field is not a valid value",
			"regex": "The field format is invalid",
			"required_if": "The field is required",
			"required": "The field is required",
			"size": "The field size must be less than 0:{size}KB",
			"url": "The field is not a valid URL",
			"verify_password": "The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character",
			"decimal": "The field does not contain a valid decimal number.",
			"phone": "The field may only contain numeric characters and a plus sign"
		},
	},
	de: {
		messages: {
			"_default": "Das Feld ist ungültig",
			"alpha": "Das Feld darf nur alphabetische Zeichen enthalten",
			"alpha_num": "Das Feld darf nur alphanumerische Zeichen enthalten",
			"alpha_dash": "Das Feld darf alphanumerische Zeichen sowie Striche und Unterstriche enthalten",
			"alpha_spaces": "Das Feld darf nur alphanumerische Zeichen und Leerzeichen enthalten",
			"between": "Das Feld muss zwischen 0:{min} und 1:{max} liegen",
			"confirmed": "Das Feld zur Bestätigung stimmt nicht überein",
			"digits": "Das Feld muss numerisch sein und exakt 0:{length} Ziffern enthalten",
			"dimensions": "Das Feld muss 0:{width} x 1:{height} Bildpunkte groß sein",
			"email": "Das Feld muss eine gültige E-Mail-Adresse sein",
			"not_one_of": "Das Feld muss ein gültiger Wert sein",
			"ext": "Das Feld muss eine gültige Datei sein",
			"image": "Das Feld muss eine Grafik sein",
			"integer": "Das Feld muss eine ganze Zahl sein",
			"length": "Die Länge muss 0:{length} sein",
			"max_value": "Das Feld darf maximal 0:{max} sein",
			"max": "Das Feld darf nicht länger als 0:{length} Zeichen sein",
			"mimes": "Das Feld muss einen gültigen Dateityp haben",
			"min_value": "Das Feld muss mindestens 0:{min} sein",
			"min": "Das Feld muss mindestens 0:{length} Zeichen lang sein",
			"numeric": "Das Feld darf nur numerische Zeichen enthalten",
			"one_of": "Das Feld muss ein gültiger Wert sein",
			"regex": "Das Format ist ungültig",
			"required_if": "Das Feld ist ein Pflichtfeld",
			"required": "Das Feld ist ein Pflichtfeld",
			"size": "Das Feld muss kleiner als 0:{size}KB sein",
			"url": "Das Feld ist keine gültige URL",
			"verify_password": "Das Passwort muss mindestens enthalten: 1 Großbuchstabe, 1 Kleinbuchstabe, 1 Zahl und ein Sonderzeichen",
			"decimal": "Das Feld enthält keine gültige Dezimalzahl.",
			"phone": "Das Feld darf nur numerische Zeichen sowie ein Plus enthalten enthalten"
		},
	}
}

configure({
	generateMessage: localize(validationMessages),
})

export default {}
