const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            phone: {        // 전화번호
                type: Sequelize.STRING(11),
                allowNull: false,
                unique: true,
            },
            password: {     // 비밀번호
                type: Sequelize.TEXT,
                allowNull: false,
            },
            name: {         // 이름
                type: Sequelize.STRING(10),
                allowNull: false,
            },
            userType: {     // 사용자 유형
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            division: {     // 소속(선생님만 해당)
                type: Sequelize.STRING(10),
                allowNull: true
            },
            grade: {        // 학년(학생, 담임선생님만 해당)
                type: Sequelize.INTEGER,
                allowNull: true
            },
            class: {        // 반(학생, 담임선생님만 해당)
                type: Sequelize.INTEGER,
                allowNull: true
            },
            studentId: {    // 번호(학생만 해당)
                type: Sequelize.INTEGER,
                allowNull: true
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {}
}