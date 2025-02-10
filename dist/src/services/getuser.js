"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = getUser;
function getUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`/api/users/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const userData = yield response.json();
            if (!userData.username) {
                throw new Error("User data is incomplete");
            }
            return userData;
        }
        catch (error) {
            console.error("Failed to fetch user:", error);
            throw new Error("Could not retrieve user information");
        }
    });
}
