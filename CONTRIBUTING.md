# 🤝 Contributing to FlowMind AI

Thank you for your interest in contributing to FlowMind AI! This document provides guidelines for contributing to the project.

---

## 🌟 Ways to Contribute

- **Report Bugs**: Found a bug? Open an issue!
- **Suggest Features**: Have an idea? We'd love to hear it!
- **Write Code**: Submit pull requests with improvements
- **Improve Documentation**: Help make our docs better
- **Share Feedback**: Tell us what you think

---

## 🐛 Reporting Bugs

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: How to reproduce the bug
3. **Expected Behavior**: What should happen
4. **Actual Behavior**: What actually happens
5. **Screenshots**: If applicable
6. **Environment**: OS, browser, versions

**Template:**
```markdown
## Bug Description
A clear description of what the bug is.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What you expected to happen.

## Actual Behavior
What actually happened.

## Screenshots
If applicable, add screenshots.

## Environment
- OS: [e.g., Windows 11]
- Browser: [e.g., Chrome 120]
- Version: [e.g., 1.0.0]
```

---

## 💡 Suggesting Features

Feature suggestions are welcome! Please:

1. Check if the feature already exists
2. Search existing issues for duplicates
3. Provide detailed description
4. Explain use case and benefits
5. Include mockups if applicable

---

## 🔧 Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/flowmind-ai.git
   cd flowmind-ai
   ```
3. Add upstream remote:
   ```bash
   git remote add upstream https://github.com/original/flowmind-ai.git
   ```
4. Create a branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. Follow setup instructions in [SETUP.md](docs/SETUP.md)

---

## 📝 Code Style Guidelines

### Python (Backend)
- Follow PEP 8 style guide
- Use meaningful variable names
- Add docstrings to functions
- Keep functions small and focused
- Write unit tests

**Example:**
```python
def calculate_engagement_rate(likes, comments, followers):
    """
    Calculate engagement rate for social media post.
    
    Args:
        likes (int): Number of likes
        comments (int): Number of comments
        followers (int): Total followers
        
    Returns:
        float: Engagement rate as percentage
    """
    if followers == 0:
        return 0.0
    return ((likes + comments) / followers) * 100
```

### JavaScript (Frontend)
- Use ES6+ syntax
- Use functional components
- Follow React best practices
- Use meaningful component names
- Keep components small

**Example:**
```javascript
const MetricCard = ({ title, value, icon: Icon }) => {
  return (
    <div className="metric-card">
      <Icon className="icon" />
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  )
}

export default MetricCard
```

---

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm run test
```

**All tests must pass before submitting PR.**

---

## 📤 Submitting Pull Requests

1. **Update your fork:**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Make your changes:**
   - Write clean, documented code
   - Add tests if applicable
   - Update documentation

3. **Commit your changes:**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

   **Commit message format:**
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation
   - `style:` Code style
   - `refactor:` Code refactoring
   - `test:` Tests
   - `chore:` Maintenance

4. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request:**
   - Go to GitHub
   - Click "New Pull Request"
   - Fill in PR template
   - Link related issues

---

## 📋 Pull Request Template

```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Fixes #(issue number)

## Testing
- [ ] Tests pass locally
- [ ] Added new tests
- [ ] Documentation updated

## Screenshots (if applicable)
Add screenshots here.

## Checklist
- [ ] Code follows project style
- [ ] Self-reviewed code
- [ ] Commented complex code
- [ ] Updated documentation
- [ ] No new warnings
- [ ] Tests added/updated
- [ ] All tests pass
```

---

## 🔍 Code Review Process

1. **Automated Checks**: CI/CD runs tests
2. **Team Review**: Team members review code
3. **Feedback**: Address review comments
4. **Approval**: Get approval from maintainers
5. **Merge**: PR is merged

**Review time: 1-3 business days**

---

## 🎨 Design Contributions

Design contributions welcome! Please:

1. Follow FlowMind design system
2. Use brand colors:
   - Primary: `#00BFFF`
   - Violet: `#8A2BE2`
   - Navy: `#0A0F1C`
3. Use Figma or similar tool
4. Export assets in multiple sizes
5. Include design rationale

---

## 📚 Documentation

Help improve documentation:

1. Fix typos and errors
2. Add examples
3. Clarify confusing sections
4. Add diagrams
5. Update outdated info

---

## 🚫 What NOT to Do

- Don't submit PRs without testing
- Don't ignore code style guidelines
- Don't make massive changes in one PR
- Don't include unrelated changes
- Don't commit sensitive data
- Don't force push to shared branches

---

## 💬 Communication

- **GitHub Issues**: For bugs and features
- **Pull Requests**: For code discussion
- **Email**: team@flowmind.ai

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## 🙏 Recognition

Contributors will be:
- Listed in README
- Mentioned in release notes
- Part of FlowMind community

---

## ❓ Questions?

- Check [documentation](docs/)
- Search existing issues
- Ask in pull request
- Email team@flowmind.ai

---

**Thank you for contributing to FlowMind AI! 🧠✨**

