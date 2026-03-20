const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const signup = async (req, res) => {
  const {
    email,
    password,
    name,
    phone,
    address,
    detail_address,
    postcode,
  } = req.body;

  try {
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: '이메일, 비밀번호, 이름은 필수입니다.',
      });
    }

    const [existingUsers] = await pool.query(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        success: false,
        message: '이미 사용 중인 이메일입니다.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      `
      INSERT INTO users (
        email,
        password,
        name,
        phone,
        address,
        detail_address,
        postcode,
        role,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, 'user', 'active')
      `,
      [
        email,
        hashedPassword,
        name,
        phone || null,
        address || null,
        detail_address || null,
        postcode || null,
      ]
    );

    return res.status(201).json({
      success: true,
      message: '회원가입이 완료되었습니다.',
      data: {
        id: result.insertId,
        email,
        name,
      },
    });
  } catch (err) {
    console.error('signup error:', err);
    return res.status(500).json({
      success: false,
      message: '회원가입 중 오류가 발생했습니다.',
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: '이메일과 비밀번호를 입력해주세요.',
      });
    }

    const [users] = await pool.query(
      `
      SELECT id, email, password, name, phone, address, detail_address, postcode, role, status
      FROM users
      WHERE email = ?
      `,
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: '이메일 또는 비밀번호가 올바르지 않습니다.',
      });
    }

    const user = users[0];

    if (user.status !== 'active') {
      return res.status(403).json({
        success: false,
        message: '비활성화된 계정입니다.',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: '이메일 또는 비밀번호가 올바르지 않습니다.',
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: '로그인 성공',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        address: user.address,
        detail_address: user.detail_address,
        postcode: user.postcode,
        role: user.role,
        status: user.status,
      },
    });
  } catch (err) {
    console.error('login error:', err);
    return res.status(500).json({
      success: false,
      message: '로그인 중 오류가 발생했습니다.',
    });
  }
};

const getMe = async (req, res) => {
  try {
    return res.status(200).json({
      message: '인증된 사용자입니다.',
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      message: '사용자 정보를 불러오는 중 오류가 발생했습니다.',
    });
  }
};

module.exports = {
  signup,
  login,
  getMe,
};